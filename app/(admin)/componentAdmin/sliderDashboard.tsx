import Button from "@/app/component/button";
import React, { Fragment } from "react"

const SliderDashboard = ({ setBtnClicked, isAdmin, user, products }: any) => {
    return (
        <React.Fragment>
            <div className="menu flex flex-col justify-between items-center w-[250px] h-[100%] p-0 m-0 border-r border-grey">

                <div className="containerButtons flex flex-col w-max h-max ">
                    <h3 className="titleMenu text-center text-lg font-bold p-5"> Product </h3>
                    <Button
                        id="AddNewProducts"
                        onClick={(e: any) => setBtnClicked(e.target.id)}
                        textButton="Add new product"
                    />

                    <Button
                        className="menu-btn-remove-project"
                        id="RemoveProducts"
                        onClick={(e: any) => setBtnClicked(e.target.id)}
                        textButton="Remove product"
                    />

                    <Button
                        className="menu-btn-remove-project"
                        id="AddNewSize_ExistProduct"
                        onClick={(e: any) => setBtnClicked(e.target.id)}
                        textButton="Add New Size And Stock"
                    />

                    <hr className="w-full bg-black my-2" />

                    <h3 className="text-center text-lg font-bold"> Category Product</h3>

                    <Button
                        className="menu-btn-remove-project"
                        id="AddNewCategory"
                        onClick={(e: any) => setBtnClicked(e.target.id)}
                        textButton="Category Product"
                    />

                    <hr className="w-full bg-black my-2" />

                    <h3 className="text-center text-lg font-bold"> Size Product</h3>

                    <Button
                        className="menu-btn-remove-project"
                        id="CreateNewSize"
                        onClick={(e: any) => setBtnClicked(e.target.id)}
                        textButton="Create New Size"
                    />

                    <hr className="w-full h-full bg-black my-2" />
                </div>

                <div className="dashboardAdminInfo mt-10">
                    <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
                    <p className="admin">
                        {" "}
                        <span>Admin </span>
                        {isAdmin && (
                            <span className="full-name">{` ${user.firstName} ${user.lastName}`}</span>
                        )}
                    </p>
                    <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
                    <div className="role">
                        {" "}
                        <span>Role </span>
                        <ul className="role-ul">
                            {user?.role.map((item: any, index: number) => {
                                return (
                                    <li className="role-li" key={index}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
                    <p className="nr-prod-online">
                        {" "}
                        <span>Nr. products online </span>
                        {`  ${products && products.length}`}
                    </p>
                    <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SliderDashboard;