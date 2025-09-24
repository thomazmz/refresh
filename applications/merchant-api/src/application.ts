import { MarketerModule } from './module'

(async () => {
  await MarketerModule.initialize()
  const application = MarketerModule.resolveApplication()
  application.listen(3001, () => {
    console.log('Marketer API listening on port 3001')
  })
})()
