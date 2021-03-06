import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {fillUD, modalisMeta} from '../redux/slices/metaSlice';
import { getNetwork } from '../redux/slices/metaSlice';
import { getAdress } from '../redux/slices/metaSlice';
import UAuth from '@uauth/js'



export const Navbar = () => {
    const dispatch = useDispatch()

    const [burger, setBurger] = useState(false)

    const { modalMeta, metaInstalled, userAdress, networkId } = useSelector(state => state.meta)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning fs-3" to="/" style={{ fontFamily: "Impact" }}>
                    MemeZzz
                </Link>
                <button className="navbar-toggler" onClick={() => setBurger(!burger)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${!burger ? 'collapse' : ''} navbar-collapse`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">Create NFT</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Swarm</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_blank"
                                rel='noreferrer'
                                href="https://blockscout.com/xdai/mainnet/token/0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469">BlockScout</a>
                        </li>

                    </ul>
                    <div className="d-flex">
                        {userAdress ?
                            <Link to="/profile"><button className="btn btn-warning fw-bold">My profile</button></Link>
                            : <button className="btn btn-warning fw-bold" onClick={() => {
                                if (metaInstalled) {
                                    dispatch(getAdress())
                                    dispatch(getNetwork(window.ethereum.networkVersion))
                                } else {
                                    dispatch(modalisMeta(true))
                                }
                            }
                            }>Log in</button>}

                        {!userAdress && <button className="btn btn-warning fw-bold mx-1" onClick={async () => {
                            const uauth = new UAuth({
                                clientID: '//pQt3bvbL/PKZqj2op1ieLexKNf1+oWzMy3M/azW6w=',
                                clientSecret: 'aSTz8HmFzatgjBK6ox8ETc/d4EMUbwlaHmA8ihKaEK4=',
                                redirectUri: 'https://nft-memezzz.surge.sh/callback',
                            })

                            try {
                                const data = await uauth.loginWithPopup()
                                console.log(data)
                                dispatch(fillUD(data.idToken.wallet_address));
                            } catch (error) {
                                console.error(error)
                            }
                        }
                        }>Log in with Unstoppable Domains</button>}
                    </div>

                </div>
            </div>
            <Modal
                size="md"
                show={modalMeta}
                onHide={() => dispatch(modalisMeta(false))}

            >
                <Modal.Header closeButton className='bg-dark text-white'>
                    <Modal.Title>
                        Log In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-center text-white'>
                    {!metaInstalled && <h3>For authorization, please, install <a
                        target="_blank"
                        rel='noreferrer'
                        href="https://metamask.io/">Metamask</a>.</h3>}
                    {networkId !== 100 && <h3>Please, <a
                        target="_blank"
                        rel='noreferrer'
                        href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup">configure and switch
                        to
                        xDai
                        network</a>.</h3>}
                </Modal.Body>
            </Modal>
        </nav>
    )
}
