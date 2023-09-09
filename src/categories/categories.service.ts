import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (await this.categoryModel.findOne({ name: createCategoryDto.name })) {
      throw new ConflictException('category name already exists');
    }
    return await this.categoryModel.create(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Cannot find category with id ' + id);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!category) {
      throw new NotFoundException('Cannot find category with id ' + id);
    }
    return category;
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
