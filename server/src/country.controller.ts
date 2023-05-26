import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetGenreResponse } from './interfaces/genre/get-genre.dto';
import { Observable } from 'rxjs';

@Controller('countries')
export class CountryController {
    constructor(@Inject('FILM_SERVICE') private readonly client: ClientProxy) {}  

    @Get()
    @ApiTags('Country')
    @ApiResponse({
        status: 200, 
        description: 'Return all countries in db',    
        type: [GetGenreResponse]
    })
    getAllCountries(): Observable<GetGenreResponse[]> {
        return this.client.send('get_countries', '');
    }

}