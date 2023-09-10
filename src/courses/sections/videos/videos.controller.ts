import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ParseMongoIdPipe } from '../../../utils/pipes/parse-mongo-id.pipe';

@Controller('courses/:course/sections/:section/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
  ) {
    return this.videosService.findAll({ section, course });
  }

  @Get(':id')
  findOne(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Param('id') _id: string,
  ) {
    return this.videosService.findOne({ _id, section, course });
  }

  @Patch(':id')
  update(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Param('id') _id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.videosService.update({ _id, section, course }, updateVideoDto);
  }

  @Delete(':id')
  remove(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Param('id') _id: string,
  ) {
    return this.videosService.remove({ _id, section, course });
  }
}
