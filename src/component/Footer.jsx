const Footer = () => {
    return (
        <div className="py-4 px-8 flex flex-shrink-0 justify-between">
            <b>&copy; LuxeLoot, {(new Date()).getFullYear()} г.</b>
            <b>...</b>
        </div>
    )
}

export default Footer;