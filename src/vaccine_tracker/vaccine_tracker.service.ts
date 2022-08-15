import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  VaccineTracker,
  VaccineTrackerDocument,
} from './schemas/vaccine_tracker.schema';
import { Model } from 'mongoose';

@Injectable()
export class VaccineTrackerService {
  constructor(
    @InjectModel(VaccineTracker.name)
    private vaccineTrackerModel: Model<VaccineTrackerDocument>,
  ) {}

  async findAll() {
    let data = await this.vaccineTrackerModel
      .aggregate([
        {
          $match: {
            YearWeekISO: { $gte: '2021-W45', $lte: '2021-W52' },
            TargetGroup: 'ALL',
            ReportingCountry: 'AT',
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

    const sliceIntoChunks = (arr, chunkSize) => {
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

      return res;
    };

    return sliceIntoChunks(d, 5);
  }
}
