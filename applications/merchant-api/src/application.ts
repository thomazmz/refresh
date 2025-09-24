import { MarketerModule } from './module'

(async () => {
  await MarketerModule.initialize()
  const application = MarketerModule.resolveApplication()
  application.listen(3000, () => {
    console.log('listening on port 3000')
  })
})()
