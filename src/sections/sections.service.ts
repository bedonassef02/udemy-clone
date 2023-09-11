import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Section, SectionDocument } from './entities/section.entity';
import { Model } from 'mongoose';
import { FilterSectionDto } from './dto/filter-section.dto';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
    private readonly coursesService: CoursesService,
  ) {}
  async create(createSectionDto: CreateSectionDto): Promise<SectionDocument> {
    const section: SectionDocument = await this.sectionModel.create(
      createSectionDto,
    );
    await this.coursesService.addSection(createSectionDto.course, section);
    return section;
  }

  findAll(filter: FilterSectionDto): Promise<SectionDocument[]> {
    return this.sectionModel.find(filter);
  }

  async findOne(filter: FilterSectionDto): Promise<SectionDocument> {
    const section = await this.sectionModel.findOne(filter);

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return section;
  }

  async update(
    filter: FilterSectionDto,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument> {
    const section: SectionDocument | undefined =
      await this.sectionModel.findOneAndUpdate(filter, updateSectionDto, {
        new: true,
      });
    if (!section) {
      throw new NotFoundException('section not found');
    }
    return section;
  }

  async remove(filter: FilterSectionDto): Promise<void> {
    await this.sectionModel.findOneAndRemove(filter);
  }
}
