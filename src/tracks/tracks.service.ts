import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID } from 'src/common/interfaces';
import { Database } from 'src/database/database';

@Injectable()
export class TracksService {
  constructor(private readonly db: Database) {}

  findAll() {
    return this.db.tracks;
  }

  findOne(id: UUID) {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);

    this.db.tracks.push(track);
    return track;
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = { ...track, ...updateTrackDto };
    this.db.tracks = this.db.tracks.map((t) =>
      t.id === id ? updatedTrack : t,
    );

    return updatedTrack;
  }

  remove(id: UUID) {
    const trackIndex = this.db.tracks.findIndex((t) => t.id === id);
    if (trackIndex < 0) throw new NotFoundException('Track not found');

    this.db.tracks.splice(trackIndex, 1);
  }
}
