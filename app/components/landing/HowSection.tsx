import AddTechniqueImageUrl from 'app/assets/add-technique.png'
import ForgettingCurveImageUrl from 'app/assets/forgetting-curve.png'
import RegisterImageUrl from 'app/assets/register-image.png'

const steps = [
    {
      id: 1,
      title: 'Sign Up',
      description:
        'Create an account in less than 2 minutes. All you need is an email address.',
      imageUrl:
        RegisterImageUrl,
    },
    {
      id: 2,
      title: 'Add Your Study Topics',
      description:
        'Enter the techniques as you study them, along with the date that they were introduced.',
      imageUrl:
        AddTechniqueImageUrl,
    },
    {
      id: 3,
      title: 'Let GrappleLogic Do the Rest',
      description:
        'Our algorythm will calculate the optimal time to review each technique.',
      imageUrl:
        ForgettingCurveImageUrl,
    },
  ]
  
  export default function HowSection() {
    return (
      <div className="bg-blue-100 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              How it Works
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">Start learning faster in 3 easy steps</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    alt=""
                    src={step.imageUrl}
                    className="w-full rounded-2xl bg-gray-100 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900">
                        {step.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  