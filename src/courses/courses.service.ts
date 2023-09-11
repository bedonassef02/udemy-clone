import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import { Model } from 'mongoose';
import { Section } from '../sections/entities/section.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const course: CourseDocument = new this.courseModel(createCourseDto);
    course.slug = createCourseDto.slug + '-' + course.id;
    return course.save();
  }

  findAll(): Promise<CourseDocument[]> {
    return this.courseModel.find();
  }

  async findOne(id: string): Promise<CourseDocument> {
    const course: CourseDocument = await this.courseModel
      .findById(id)
      .populate({
        path: 'sections',
        populate: {
          path: 'videos',
        },
      });
    if (!course) {
      throw new NotFoundException(`course with id ${id} not found`);
    }
    return course;
  }

  async addSection(course: string, section: Section): Promise<void> {
    const dbCourse: CourseDocument = await this.courseModel.findById(course);
    dbCourse.sections.push(section);
    await dbCourse.save();
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
