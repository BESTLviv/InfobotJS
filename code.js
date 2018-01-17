import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import Koa from 'koa'
import Router from 'koa-router'

const TOKEN = config.get('token')
const Bot = new TelegramBot(TOKEN)

const app = new Koa()
