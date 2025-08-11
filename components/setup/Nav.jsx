import Link from 'next/link'


function Nav({ active }) {
    return (
        <div className="flex-row my-8 mx-auto w-full flex-row text-center">
            <Link href='/setup/verify-otp' className={(active === 'otp' ? 'font-rubikMedium ' : '') + 'mx-2'}>Verify Otp</Link>
            {'>'}
            <Link href='/setup/password' className={(active === 'password' ? 'font-rubikMedium ' : '') + 'mx-2'}>Set password</Link>
            {/* {'>'}
            <Link href='/setup/profile' className={(active === 'profile' ? 'font-rubikMedium ' : '') + 'mx-2'}>Profile</Link> */}
        </div>
    )
}

export default Nav