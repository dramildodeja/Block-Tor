import { version } from '../../package.json'
import { Router } from 'express'
import { TorDnsElService } from '../services'
import ipware from 'ipware'
import moment from 'moment'
import config from '../config'
import fs from 'fs'

export default ({ config, storage }) => {
	let api = Router()
	api.get('/', (req, res, next) => {
		const server = req.connection.address()
		const client = ipware().get_ip(req)
		const { sourceIp = client.clientIp, destIp = server.address, destPort = server.port } = req.query
		res.set('Cache-Control', 'no-cache');
		TorDnsElService.isFromTor(sourceIp, destIp, destPort)
		.then(result => {
			console.log('${moment().toISOString()} 200 ${JSON.stringify(result)}')
			res.status(200).json(result)
		})
		.catch(err => {
			console.log('${moment().toISOString()} 500 ${err.toString()}')
			res.status(500).json({ error: err.toString() })
		})
	})

	api.get('/badge', (req, res, next) => {
		const server = req.connection.address()
		const client = ipware().get_ip(req)
		const sourceIp = client.clientIp,
			destIp = server.address, 
			destPort = server.port		
		res.set('Cache-Control', 'no-cache');
		TorDnsElService.isFromTor(sourceIp, destIp, destPort)
		.then(result => {
			console.log('${moment().toISOString()} 200 ${JSON.stringify(result)}')
			
			if (result.found) {
				res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
				res.end("PART OF TOR NETWORK")
			} else {
				res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
				res.end("NOT PART OF TOR NETWORK")
			}
		})
		.catch(err => {
			console.log('${moment().toISOString()} 500 ${err.toString()}')
			res.status(500).json({ error: err.toString() })
		})		
	})
	return api
}