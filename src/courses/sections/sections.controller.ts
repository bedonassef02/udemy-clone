import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ParseMongoIdPipe } from '../../utils/pipes/parse-mongo-id.pipe';
import { SectionDocument } from './entities/section.entity';

@Controller('courses/:course/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(
    @Param('course', ParseMongoIdPipe) course: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<SectionDocument> {
    createSectionDto['course'] = course;
    return this.sectionsService.create(createSectionDto);
  }

  @Get()
  findAll(
    @Param('course', ParseMongoIdPipe) course: string,
  ): Promise<SectionDocument[]> {
    return this.sectionsService.findAll(course);
  }

  @Get(':id')
  findOne(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<SectionDocument> {
    return this.sectionsService.findOne(id, course);
  }

  @Patch(':id')
  update(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument> {
    return this.sectionsService.update(id, course, updateSectionDto);
  }

  @Delete(':id')
  async remove(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.sectionsService.remove(id, course);
  }
}
