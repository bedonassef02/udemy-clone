import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment } from './entities/enrollment.entity';
import { Model } from 'mongoose';
import { FilterEnrollmentDto } from './dto/filter-enrollment.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<Enrollment>,
  ) {}
  create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentModel.create(createEnrollmentDto);
  }

  findAll(filter: FilterEnrollmentDto) {
    return this.enrollmentModel.find(filter);
  }

  async isUserEnrollToCourse(user: string, course: string): Promise<boolean> {
    const dbCourse = await this.enrollmentModel.findOne({ user, course });
    return dbCourse ? true : false;
  }
}
