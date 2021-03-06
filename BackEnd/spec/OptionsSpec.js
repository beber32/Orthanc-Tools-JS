const Options = require('../model/Options')

describe('Testing Options', () =>{

    it('should be 22 00 by defaults', async () => {

        let schedule =await Options.getOptions()
        expect(schedule.hour).toBe(22)
        expect(schedule.min).toBe(0)

    })

    it('should set schedule', async ()=> {
        await Options.setScheduleTime(21, 30);
        let schedule =await Options.getOptions()
        expect(schedule.hour).toBe(21)
        expect(schedule.min).toBe(30)
        await Options.setScheduleTime(22, 00);
    })

    it('shoud set orthanc settings', () => {
        Options.setOrthancConnexionSettings('http://localhost', 8042, 'salimTest', 'salim')
        expect(Options.getOrthancConnexionSettings()).toEqual({
            OrthancAddress : 'http://localhost',
            OrthancPort : 8042,
            OrthancUsername : 'salimTest',
            OrthancPassword : 'salim'
        })
    })
})