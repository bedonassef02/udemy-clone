import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Section, SectionDocument } from './entities/section.entity';
import { Model } from 'mongoose';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
  ) {}
  create(createSectionDto: CreateSectionDto): Promise<SectionDocument> {
    return this.sectionModel.create(createSectionDto);
  }

  findAll(course: string): Promise<SectionDocument[]> {
    return this.sectionModel.find({ course });
  }

  async findOne(_id: string, course: string): Promise<SectionDocument> {
    const section = await this.sectionModel.findOne({ _id, course });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return section;
  }

  async update(
    _id: string,
    course: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument> {
    const section: SectionDocument | undefined =
      await this.sectionModel.findOneAndUpdate(
        {
          _id,
          course,
        },
        updateSectionDto,
        { new: true },
      );
    if (!section) {
      throw new NotFoundException('section not found');
    }
    return section;
  }

  async remove(_id: string, course: string): Promise<void> {
    await this.sectionModel.findOneAndRemove({ _id, course });
  }
}
