import { Input } from '@/ui/input.tsx'

export const HomePage = () => (
    <>
        <div className="ml-[90px] mr-5 py-3">
            <Input type="email" placeholder="Искать здесь..." />
        </div>
        <h1 className="mt-8 text-3xl font-bold">Здравствуйте, Иван!</h1>
    </>
)
