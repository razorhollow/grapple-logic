import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is spaced repetition?",
    answer:
      "Spaced repetition, also known as the Ebbinghaus Method, is a learning technique that involves reviewing techniques at optimal intervals to maximize retention. By practicing techniques just before you're likely to forget them, you strengthen your long-term memory and make your training more efficient and effective.",
  },
  {
    question: "Do I need to be an advanced practitioner to use Grapple Logic?",
    answer:
      "No, Grapple Logic is designed for all levels. Whether you're just starting out or you're a seasoned competitor, our personalized lesson plans adapt to your needs and goals.",
  },
  {
    question: "How long does it take to see results with Grapple Logic?",
    answer:
      "Typically, users start noticing improvements within a few weeks of consistent use. By regularly following the personalized review schedule, you can expect to see enhanced technique retention and improved muscle memory in as little as 3-4 weeks.",
  },
  {
    question: "Can I use Grapple Logic if I don't train every day?",
    answer:
      "Absolutely! Grapple Logic’s smart scheduling feature adapts to your personal training frequency. You can train on your schedule, and the app will make sure you still progress optimally.",
  },
  {
    question: "Is Grapple Logic meant for individuals or coaches?",
    answer:
      "Grapple Logic can be a valuable tool for both individuals and coaches. For coaches, it helps create structured lesson plans and track student progress, ensuring effective development using proven learning methods. For individuals, it provides personalized guidance for efficient progress during self-directed study.",
  },
]

export default function FAQSection() {
  return (
    <div className="bg-white" id='faq'>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
