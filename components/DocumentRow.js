import React from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/dist/client/router'

function DocumentRow({ id, filename, date}) {
    const router = useRouter()

    return (
        <div className="flex items-center max-w-3xl p-4 mx-auto hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
            onClick={() => router.push(`/doc/${id}`)}
        >
            <Icon
                name="article"
                size="3xl"
                color="blue"
            />
            <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
            <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
            <Button
                color="gray"
                buttonType="outline"
                iconOnly={true}
                rounded={true}
                ripple="dark"
                className="border-0 pl-7"
            >
                <Icon name="more_vert" size="3xl" color="gray" />
            </Button>
        </div>
    )
}

export default DocumentRow
