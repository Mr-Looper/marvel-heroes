import config from './marvel.config'
import md5 from 'crypto-js/md5'

export async function marvel(endpoint, body) {
	const headers = { 'Content-Type': 'application/json' }
  
	const config = {
	  method: 'GET',
	  headers: {
			...headers,
		}
	}
  
	let data
	try {
	  const response = await window.fetch(endpoint, config)
	  data = await response.json()
	  if (response.statusText === 'OK') {
			return data.data
	  }
	  throw new Error(response.statusText)
		} catch (err) {
			return Promise.reject(err.message ? err.message : data)
		}
  }
  
  marvel.get = function (endpoint, params) {
		let url = new URL(`${config.baseurl}${endpoint}`)
		Object.keys(params).forEach(key => {
			if(key && key !== '' && params && params[key] && params[key] !== ''){
				url.searchParams.append(key, params[key])
			}
		})
		return marvel(url)
	}
	
	marvel.params = function(){
		return {
			ts: (new Date()).getTime(),
			apikey: config.public_key,
			hash: md5(`${(new Date()).getTime()}${config.private_key}${config.public_key}`)
		}
	}