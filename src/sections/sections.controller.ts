import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { SectionDocument } from './entities/section.entity';
import { Roles } from '../utils/decorators/roles.decorator';
import { USER_ROLES } from '../users/utils/types/user-role';
import { Public } from '../utils/decorators/public.decorator';
import { IsUserEnrolledGuard } from '../courses/guards/is-user-enrolled.guard';

@Controller({ path: 'courses/:course/sections', version: '1' })
@UseGuards(IsUserEnrolledGuard)
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @Roles(USER_ROLES.INSTRUCTOR)
  create(
    @Param('course', ParseMongoIdPipe) course: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<SectionDocument> {
    createSectionDto['course'] = course;
    return this.sectionsService.create(createSectionDto);
  }

  @Get()
  @Public()
  findAll(
    @Param('course', ParseMongoIdPipe) course: string,
  ): Promise<SectionDocument[]> {
    return this.sectionsService.findAll({ course });
  }

  @Get(':id')
  @Public()
  findOne(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id', ParseMongoIdPipe) _id: string,
  ): Promise<SectionDocument> {
    return this.sectionsService.findOne({ _id, course });
  }

  @Patch(':id')
  @Roles(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  update(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id') _id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument> {
    return this.sectionsService.update({ _id, course }, updateSectionDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  async remove(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id') _id: string,
  ): Promise<void> {
    await this.sectionsService.remove({ _id, course });
  }
}
