export default function GlassCard({ icon: Icon, heading, text }: { icon: React.ElementType, heading: string, text: string }) {
    return (
        <div className="rounded-md px-6 py-4 text-sm/6 text-gray-100 bg-white/20 backdrop-blur-md border border-white/20 shadow-md">
            <Icon className="h-6 w-6" />
            <h3 className="font-bold my-4">{heading}</h3>
            <p className="text-gray-200 text-xs">{text}</p>
        </div>
    );
}