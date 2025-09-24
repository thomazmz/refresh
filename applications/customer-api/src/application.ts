import { CustomerModule } from './module'

(async () => {
  await CustomerModule.initialize()
  const application = CustomerModule.resolveApplication()
  application.listen(3002, () => {
    console.log('Customer API listening on port 3002')
  })
})()
