import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './country.model';

@Injectable()
export class CountryService {
    constructor(@InjectModel(Country) private countryRepository : typeof Country){}

    async addCountry(name : string){
        return await this.countryRepository.create({name : name});
    }

    async getCountryByName(name : string){
        return await this.countryRepository.findOne({where : {name : name}});
    }

    async getAllCountries(){
        return await this.countryRepository.findAll();
    }

    async updateCountry(updateCountryDto) {
        let updatedCountry = await this.countryRepository.findOne({where : {country_id : updateCountryDto.id}});
        updatedCountry.name = updateCountryDto.name;
        return await updatedCountry.save();
    }
}
