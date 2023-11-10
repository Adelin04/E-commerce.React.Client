import Button from "@/app/component/button";

interface PropsHeaderCard {
    close: () => any,
    eventButtons: [[undefined, () => Promise<void>]]
}

export default function HeaderCard({ close, eventButtons }: PropsHeaderCard) {
    return (
        <div className="headerAddNewProduct flex justify-between w-full h-max">
            {eventButtons.map((event: any) => {
                return (

                    < div className="leftSideHeaderAddNewProduct flex " >
                        <Button
                            onClick={event}
                            textButton={'Save Multiple Products'}
                        />
                    </div>
                )

            })}

            <div className="rightSideAddNewProduct flex ">
                <Button
                    onClick={() => { close() }}
                    textButton={'X'}
                />

            </div>

        </div >
    )
}

