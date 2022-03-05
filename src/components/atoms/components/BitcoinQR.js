import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export const BitcoinQR = ({
  title,
  bitcoinAddress,
  amount,
  message,
  time,
  exp,
}) => {
  const [qrImg, setQrImg] = useState(null)
  useEffect(() => {
    QRCode.toDataURL(
      `bitcoin:${bitcoinAddress}?amount=${amount}&message=${encodeURIComponent(
        message
      )}&time=${time}&exp=${exp}`,
      { errorCorrectionLevel: 'H' }
    )
      .then((url) => {
        setQrImg(url)
      })
      .catch((err) => {
        console.error(err)
      })
  })
}