import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDocument } from './entities/course.entity';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { Roles } from '../utils/decorators/roles.decorator';
import { USER_ROLES } from '../users/utils/types/user-role';
import { Public } from '../utils/decorators/public.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  create(@Body() createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @Public()
  findAll(): Promise<CourseDocument[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<CourseDocument> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDocument> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UsePipes(ParseMongoIdPipe)
  @Roles(USER_ROLES.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    await this.coursesService.remove(id);
  }
}
