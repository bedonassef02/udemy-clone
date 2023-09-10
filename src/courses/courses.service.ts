import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    return this.courseModel.create(createCourseDto);
  }

  findAll(): Promise<CourseDocument[]> {
    return this.courseModel.find();
  }

  async findOne(id: string): Promise<CourseDocument> {
    const course: CourseDocument = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException(`course with id ${id} not found`);
    }
    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDocument> {
    const course: CourseDocument = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true },
    );
    if (!course) {
      throw new NotFoundException(`course with id ${id} not found`);
    }
    return course;
  }

  async remove(id: string): Promise<void> {
    await this.courseModel.findByIdAndDelete(id);
  }
}
