import { DebouncedInput } from '@/components/debounced-input'
import { PageContentHeader } from '@/modules/schedules/all-schedules-tab/components/page-content-header.tsx'

export const AllSchedulesTab = () => (
    <div className="mx-auto w-[95%]">
        <PageContentHeader />
        <DebouncedInput className="my-8" value={'placeholder'} onChange={() => void 0} />
    </div>
)
