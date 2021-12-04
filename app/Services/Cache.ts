import Redis from '@ioc:Adonis/Addons/Redis'

class Cache {
    public async save (key, data, minutes) {
        await Redis.setex(key, minutes * 60, JSON.stringify(data))
    }

    public async get (key) {
        return await Redis.get(key)
    }
}

export default new Cache()
