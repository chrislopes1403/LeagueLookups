import axios from 'axios';

const GeneralApi =  axios.create({
    baseURL:'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/'
});

const DetailsApi = axios.create({
    baseURL:'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/'
});


export { GeneralApi,DetailsApi}