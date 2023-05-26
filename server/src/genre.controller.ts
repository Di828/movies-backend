import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddGenreDto } from './interfaces/genre/add-genre.dto';
import { UpdateGenreDto } from './interfaces/genre/update-genre.dto';
import { GetGenreResponse } from './interfaces/genre/get-genre.dto';
import { Observable } from 'rxjs';

@Controller('genres')
export class GenresController {
    constructor(@Inject('FILM_SERVICE') private readonly client: ClientProxy) {}  

    @Get()
    @ApiTags('Genre')
    @ApiResponse({
        status: 200, 
        description: 'Return all genres in db',    
        type: [GetGenreResponse]
    })
    getAllGenres(): Observable<GetGenreResponse[]> {
      return this.client.send('get_genres', '');
    }
    
    @Post()  
    @ApiTags('Genre')
    @ApiResponse({
        status: 200, 
        description: 'Return created genre', 
        type: GetGenreResponse           
    })      
    addGenre(@Body() addGenreDto : AddGenreDto){          
        return this.client.send('add_genre', addGenreDto);
    }

    @Put()  
    @ApiTags('Genre')
    @ApiResponse({
        status: 200, 
        description: 'Return updated genre',            
        type: GetGenreResponse
    })      
    updateGenre(@Body() updateGenreDto : UpdateGenreDto){          
        return this.client.send('update_genre', updateGenreDto);
    }    
}
