import { mount } from '@vue/test-utils'
import Error from '@/components/Error'

const demoMessage = 'demo error message'

describe('Error.vue', () => {
  it('Render error mesage', () => {
    const wrapper = mount(Error, {
      propsData: {
        message: demoMessage
      }
    })

    expect(wrapper.props().message).toBe(demoMessage)
    expect(wrapper.html()).toContain(demoMessage)
  })
})
