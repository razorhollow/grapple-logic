import {
    ArrowPathRoundedSquareIcon,
    BoltIcon,
    FingerPrintIcon,
  } from '@heroicons/react/20/solid'

  import AppScreenshotUrl from 'app/assets/calendar-screenshot.png'
  
  const features = [
    {
      name: 'Perosonalized Lesson Plans',
      description: 'Craft your journey with lesson plans tailored to your unique needs. Customize based on your favorite techniques, upcoming competitions, or areas you want to improve.',
      icon: FingerPrintIcon,
    },
    {
      name: 'Mastery Through Spaced Repetition',
      description: 'Our advanced learning algorithm ensures you revisit techniques at the perfect time, transforming short-term recall into long-term mastery.',
      icon: ArrowPathRoundedSquareIcon,
    },
    {
      name: 'Science That Works',
      description: 'Studies have shown that using spaced repetition can increase retention by up to 60%. Grapple Logic helps you overcome the forgetting curve by introducing scientifically proven repetition cycles. You can be sure that every minute on the mat counts.',
      icon: BoltIcon,
    },
  ];
  
  
  export default function FeatureSection() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Your Path to Success</h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl">
              Study Brazilian Jiu-Jitsu Smarter and Faster
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
            Our science-backed approach helps you develop techniques and strategy with personalized lesson plans and efficient learning. Grapple Logic is built to help you grow at every step of your BJJ journey.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              alt="App screenshot"
              src={AppScreenshotUrl}
              width={2432}
              height={1442}
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  