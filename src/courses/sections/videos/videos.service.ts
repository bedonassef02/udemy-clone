import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './entities/video.entity';
import { Model } from 'mongoose';
import { FilterVideosDto } from './dto/filter-videos.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}

  create(createVideoDto: CreateVideoDto): Promise<VideoDocument> {
    return this.videoModel.create(createVideoDto);
  }

  findAll(filter: FilterVideosDto): Promise<VideoDocument[]> {
    return this.videoModel.find();
  }

  async findOne(filter: FilterVideosDto): Promise<VideoDocument> {
    const video: VideoDocument | undefined =
      await this.videoModel.findOneAndUpdate(filter, {
        new: true,
      });
    if (!video) {
      throw new NotFoundException('video not found');
    }
    return video;
  }

  async update(
    filter: FilterVideosDto,
    updateVideoDto: UpdateVideoDto,
  ): Promise<VideoDocument> {
    const video: VideoDocument | undefined =
      await this.videoModel.findOneAndUpdate(filter, updateVideoDto, {
        new: true,
      });
    if (!video) {
      throw new NotFoundException('video not found');
    }
    return video;
  }

  async remove(filter: FilterVideosDto): Promise<void> {
    await this.videoModel.findOneAndRemove(filter);
  }
}
