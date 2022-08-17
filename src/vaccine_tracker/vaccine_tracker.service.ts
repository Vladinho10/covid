import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  VaccineTracker,
  VaccineTrackerDocument,
} from './schemas/vaccine_tracker.schema';
import { Model } from 'mongoose';
import { VaccineParamDto } from './dto/vaccineParam.dto';
import { SortEnum } from './enums/sort.enum';

@Injectable()
export class VaccineTrackerService {
  constructor(
    @InjectModel(VaccineTracker.name)
    private vaccineTrackerModel: Model<VaccineTrackerDocument>,
  ) {}

  async findAll(query: VaccineParamDto) {
    let data = await this.vaccineTrackerModel
      .aggregate([
        {
          $match: {
            YearWeekISO: { $gte: query.dateFrom, $lte: query.dateTo },
            TargetGroup: 'ALL',
            ReportingCountry: query.c,
          },
        },
        {
          $group: {
            _id: '$YearWeekISO',
            FirstDoseSum: { $sum: '$FirstDose' },
            SecondDoseSum: { $sum: '$SecondDose' },
            DoseAdditional1Sum: { $sum: '$DoseAdditional1' },
            DoseAdditional2Sum: { $sum: '$DoseAdditional2' },
          },
        },
      ])
      .exec();

    data = data.sort((a, b) => {
      return a['_id'].localeCompare(b['_id']);
    });

    const d = data.map((item) => {
      const { _id, ...doses } = item;
      let dosesSum = 0;
      for (const dose in doses) {
        dosesSum += doses[dose];
      }
      return {
        week: item['_id'],
        dose: dosesSum,
      };
    });

    const sliceIntoChunks = (arr, chunkSize, sort) => {
      const res = [];

      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        let dosesSum = 0;

        chunk.forEach((item) => {
          const { week, dose } = item;
          dosesSum += dose;
        });

        res.push({
          weekStart: chunk[0].week,
          weekEnd: chunk[chunk.length - 1].week,
          NumberDosesReceived: dosesSum,
        });
      }

      if (sort === SortEnum.NumberDosesReceived) {
        res.sort((a, b) => {
          return b['NumberDosesReceived'] - a['NumberDosesReceived'];
        });
      }

      return res;
    };

    return sliceIntoChunks(d, query.rangeSize, query.sort);
  }
}
