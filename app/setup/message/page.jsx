import Image from 'next/image'

import errorImg from '@/assets/images/error-img.png'

function Page() {
    return (
        <div className="mx-auto text-center">
            <Image src={errorImg} width={150} height={150} className='mx-auto my-2' alt='Error' />
            <h2 className='text-3xl my-3 font-rubikBold'>Invite Link Expired</h2>
            <p>
                Oops! It looks like this invite link has expired. To gain access, please contact your super admin to request a new invitation.
            </p>
        </div>
    )
}

export default Page