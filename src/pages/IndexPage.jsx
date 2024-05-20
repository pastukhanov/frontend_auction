const IndexPage = () => {

    console.log(process.env.REACT_APP_API_URL);

    return (
        <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
            <div className="bg-white min-h-20 w-full text-left mx-10">
                <p className="text-2xl font-bold pl-4 pt-4">&#128640; Добро пожаловать!</p>
            </div>

            <div className="pb-2 bg-white min-h-20 w-full text-left mx-10">
                <p className="text-2xl font-bold pl-4 pt-4">&#128075; Знакомство с LuxeLoot</p>
                <p className="font-bold pl-4 pt-4">LuxeLoot - это сайт, позволяющий проводить онлайн акционы произведений искусств</p>
            </div>

            <div className="pb-2 bg-white min-h-20 w-full text-left mx-10">
                <p className="text-2xl font-bold pl-4 pt-4">&#10067; Как участвовать в аукционах?</p>
                <p className="font-bold pl-4 pt-4">На странице "Все акционы" вы можете увидеть различные акционы, которые прошли предварительную модерацию.
                        Выбирете тот, который вам больше всего понравился, нажимайте на него, после чего нажимайте на кнопку "Участвовать".</p>
                <p className="font-bold pl-4 pt-4">Поздравляем! Вы учавствуете в первом аукционе.</p>
            
            </div>
        </div>
    )

}

export default IndexPage;