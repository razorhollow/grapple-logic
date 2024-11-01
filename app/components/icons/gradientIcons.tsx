import { SparklesIcon, ChartBarIcon, CalendarIcon, BeakerIcon } from '@heroicons/react/20/solid'

export function SparklesGradientIcon() {
  return (
    <div className="relative h-8 w-8">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="blueBeltGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#ADD8E6" /> {/* Light blue */}
            <stop offset="100%" stopColor="#0055A4" /> {/* Full blue belt color */}
          </linearGradient>
        </defs>
      </svg>
      <SparklesIcon className="h-full w-full fill-[url(#blueBeltGradient)]" />
    </div>
  )
}

export function GrowthChartIcon() {
  return (
    <div className="relative h-8 w-8">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="purpleBeltGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#ffffff" /> {/* Light green */}
            <stop offset="100%" stopColor="#c4c4c4" /> {/* Dark green */}
          </linearGradient>
        </defs>
      </svg>
      <ChartBarIcon className="h-full w-full fill-[url(#purpleBeltGradient)]" />
    </div>
  );
}

export function SmartCalendarIcon() {
  return (
    <div className="relative h-8 w-8">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="brownBeltGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#42a5f5" /> {/* Light blue */}
            <stop offset="100%" stopColor="#0d47a1" /> {/* Dark blue */}
          </linearGradient>
        </defs>
      </svg>
      <CalendarIcon className="h-full w-full fill-[url(#brownBeltGradient)]" />
    </div>
  );
}

export function ScienceBeakerIcon() {
  return (
    <div className="relative h-8 w-8">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="redBeltGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#ad83ff" />
            <stop offset="100%" stopColor="#7d3aff" />
          </linearGradient>
        </defs>
      </svg>
      <BeakerIcon className="h-full w-full fill-[url(#redBeltGradient)]" />
    </div>
  );
}