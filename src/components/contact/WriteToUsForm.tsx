import { Button, Form, Input, Select, message } from 'antd'
import { useState } from 'react'
import { ApiError } from '../../api/client'
import { createContactMessage } from '../../api/contact-messages'
import { COUNTRY_DIAL_OPTIONS, dialCodeForIso } from '../../lib/countryDialCodes'

type WriteToUsFormValues = {
  name: string
  email: string
  countryIso: string
  phone: string
  message: string
}

export function WriteToUsForm() {
  const [form] = Form.useForm<WriteToUsFormValues>()
  const [submitting, setSubmitting] = useState(false)

  const onFinish = async (values: WriteToUsFormValues) => {
    setSubmitting(true)
    try {
      await createContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        countryCode: dialCodeForIso(values.countryIso),
        phone: values.phone.trim(),
        message: values.message.trim(),
      })
      message.success('Message sent. We will get back to you soon.')
      form.setFieldValue('message', undefined)
    } catch (error) {
      message.error(
        error instanceof ApiError ? error.message : 'Unable to send your message.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
        Write to us
      </h2>
      <p className="mt-1 text-sm text-muted">
        Send a message and we&apos;ll get back to you.
      </p>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={{ countryIso: 'IN' }}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Name is required' },
            { max: 120, message: 'Name must be 120 characters or fewer' },
          ]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input type="email" placeholder="you@example.com" />
        </Form.Item>

        <Form.Item label="Phone" required className="!mb-0">
          <div className="flex gap-2">
            <Form.Item
              name="countryIso"
              rules={[{ required: true, message: 'Select a country' }]}
              className="!mb-4"
            >
              <Select
                showSearch
                options={COUNTRY_DIAL_OPTIONS}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.search ?? option?.label ?? '')
                    .toLowerCase()
                    .includes(input.trim().toLowerCase())
                }
                className="w-[9.25rem]"
                popupMatchSelectWidth={280}
                aria-label="Country code"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Phone is required' },
                {
                  type: 'string',
                  min: 6,
                  max: 15,
                  message: 'Enter a phone number between 6 and 15 characters',
                },
              ]}
              className="!mb-4 min-w-0 flex-1"
            >
              <Input
                inputMode="tel"
                maxLength={15}
                placeholder="Phone number"
              />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[
            { required: true, message: 'Message is required' },
            { max: 2000, message: 'Message must be 2000 characters or fewer' },
          ]}
        >
          <Input.TextArea
            rows={4}
            maxLength={2000}
            placeholder="How can we help?"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          className="w-full sm:w-auto"
        >
          Send message
        </Button>
      </Form>
    </section>
  )
}
