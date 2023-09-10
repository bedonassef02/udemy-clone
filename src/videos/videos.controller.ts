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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { IsUserEnrolledGuard } from '../courses/guards/is-user-enrolled.guard';
import { Roles } from '../utils/decorators/roles.decorator';
import { USER_ROLES } from '../users/utils/types/user-role';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { Public } from '../utils/decorators/public.decorator';

@Controller({ path: 'courses/:course/sections/:section/videos', version: '1' })
@UseGuards(IsUserEnrolledGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @Roles(USER_ROLES.INSTRUCTOR)
  create(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @Public()
  findAll(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
  ) {
    return this.videosService.findAll({ section, course });
  }

  @Get(':id')
  // TODO: make for enrolled users only
  @Public()
  findOne(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Param('id') _id: string,
  ) {
    return this.videosService.findOne({ _id, section, course });
  }

  @Patch(':id')
  @Roles(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  // TODO: update name or description only
  update(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Param('id') _id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.videosService.update({ _id, section, course }, updateVideoDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  remove(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('section', ParseMongoIdPipe) section: string,
    @Param('id') _id: string,
  ) {
    return this.videosService.remove({ _id, section, course });
  }
}
