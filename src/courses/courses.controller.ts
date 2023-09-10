import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDocument } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(): Promise<CourseDocument[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CourseDocument> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDocument> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.coursesService.remove(id);
  }
}
