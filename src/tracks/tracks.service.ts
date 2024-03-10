import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID } from 'src/common/interfaces';

@Injectable()
export class TracksService {
  tracks: Track[] = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: UUID) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);

    this.tracks.push(track);
    return track;
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = { ...track, ...updateTrackDto };
    this.tracks = this.tracks.map((t) => (t.id === id ? updatedTrack : t));

    return updatedTrack;
  }

  remove(id: UUID) {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);
    if (trackIndex < 0) throw new NotFoundException('Track not found');

    this.tracks.splice(trackIndex, 1);
  }
}
