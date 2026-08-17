import { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Truck,
  Zap,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'

type CheckoutStep = 'shipping' | 'payment' | 'success'

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, discountAmount, shippingFee, taxAmount, total, clearCart } = useCart()
  
  const [step, setStep] = useState<CheckoutStep>('shipping')
  const [shippingData, setShippingData] = useState({
    fullName: 'Julian Mercer',
    email: 'julian@retro-vibe.com',
    address: '142 Bedford Avenue, Apt 4B',
    city: 'Brooklyn',
    postalCode: '11211',
    country: 'United States',
  })

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple'>('card')
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '10/28',
    cvv: '888',
    name: 'Julian Mercer',
  })

  const [orderId, setOrderId] = useState('')

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePlaceOrder = () => {
    const generatedId = `RV-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setStep('success')
    clearCart()

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e59500', '#262626', '#d97706', '#ffffff'],
    })
  }

  const handleClose = () => {
    setIsCheckoutOpen(false)
    setTimeout(() => {
      setStep('shipping')
    }, 300)
  }

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-card text-foreground border-[2px] border-foreground rounded-[2px] shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
        
        {/* Header (Solid Secondary) */}
        <DialogHeader className="p-5 border-b-[1.5px] border-foreground bg-secondary text-foreground text-left">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-mono font-black uppercase flex items-center gap-2 text-foreground">
              <Lock className="h-4 w-4" />
              <span>
                {step === 'shipping' && '1. Shipping Address'}
                {step === 'payment' && '2. Payment & Order Review'}
                {step === 'success' && '✦ Order Confirmed'}
              </span>
            </DialogTitle>

            {step !== 'success' && (
              <span className="text-xs font-mono font-black px-2.5 py-0.5 bg-amber-400 text-black border border-foreground">
                ${total.toFixed(2)}
              </span>
            )}
          </div>
        </DialogHeader>

        {/* Body (Solid Card) */}
        <div className="p-5 bg-card text-foreground">
          {/* STEP 1: Shipping Address */}
          {step === 'shipping' && (
            <form onSubmit={handleNextToPayment} className="space-y-3.5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-foreground">
                    Full Name
                  </label>
                  <Input
                    required
                    value={shippingData.fullName}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, fullName: e.target.value })
                    }
                    className="h-9 text-xs bg-background text-foreground"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    required
                    value={shippingData.email}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, email: e.target.value })
                    }
                    className="h-9 text-xs bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-foreground">
                  Street Address
                </label>
                <Input
                  required
                  value={shippingData.address}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, address: e.target.value })
                  }
                  className="h-9 text-xs bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-foreground">
                    City
                  </label>
                  <Input
                    required
                    value={shippingData.city}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, city: e.target.value })
                    }
                    className="h-9 text-xs bg-background text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-foreground">
                    Postal Code
                  </label>
                  <Input
                    required
                    value={shippingData.postalCode}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, postalCode: e.target.value })
                    }
                    className="h-9 text-xs bg-background text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-foreground">
                    Country
                  </label>
                  <Input
                    required
                    value={shippingData.country}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, country: e.target.value })
                    }
                    className="h-9 text-xs bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>{cart.length} item(s) in order</span>
                <span className="flex items-center gap-1 text-foreground font-bold">
                  <Truck className="h-3.5 w-3.5" />
                  Express 2-3 Day Dispatch
                </span>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className="w-full sm:w-auto h-10 px-6 font-black text-xs gap-1.5"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Method */}
          {step === 'payment' && (
            <div className="space-y-4 text-left font-mono">
              {/* Payment Selectors */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 border-[1.5px] text-center transition-all cursor-pointer rounded-[2px] ${
                    paymentMethod === 'card'
                      ? 'border-foreground bg-amber-400 text-black font-black shadow-[2px_2px_0px_0px_hsl(var(--foreground))]'
                      : 'border-foreground/40 bg-card text-foreground'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-xs uppercase block">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-2.5 border-[1.5px] text-center transition-all cursor-pointer rounded-[2px] ${
                    paymentMethod === 'apple'
                      ? 'border-foreground bg-amber-400 text-black font-black shadow-[2px_2px_0px_0px_hsl(var(--foreground))]'
                      : 'border-foreground/40 bg-card text-foreground'
                  }`}
                >
                  <Zap className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-xs uppercase block">Apple Pay</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-2.5 p-3.5 bg-secondary border-[1.5px] border-foreground/30 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-foreground">Card Number</label>
                    <Input
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData({ ...cardData, number: e.target.value })
                      }
                      className="bg-card text-foreground h-9 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-foreground">Expires</label>
                      <Input
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({ ...cardData, expiry: e.target.value })
                        }
                        className="bg-card text-foreground h-9 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-foreground">CVV</label>
                      <Input
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvv: e.target.value })
                        }
                        className="bg-card text-foreground h-9 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="p-3.5 bg-secondary border-[1.5px] border-foreground/30 space-y-1 text-xs text-foreground font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-foreground pt-1.5 border-t border-foreground/20">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-2.5 pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('shipping')}
                  className="gap-1 text-xs"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>BACK</span>
                </Button>

                <Button
                  type="button"
                  variant="default"
                  size="default"
                  onClick={handlePlaceOrder}
                  className="h-10 px-6 font-black text-xs gap-1.5"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>PAY ${total.toFixed(2)}</span>
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Success */}
          {step === 'success' && (
            <div className="py-4 text-center space-y-4 font-mono">
              <div className="h-12 w-12 mx-auto bg-amber-400 border border-foreground text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black font-heading text-foreground uppercase">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Receipt and tracking updates sent to{' '}
                  <strong className="text-foreground">{shippingData.email}</strong>.
                </p>
              </div>

              {/* Receipt */}
              <div className="p-3.5 bg-secondary border-[1.5px] border-foreground max-w-sm mx-auto text-left space-y-1.5 text-xs text-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-bold text-foreground">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="text-foreground font-bold">{shippingData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="text-foreground">{shippingData.city}, {shippingData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dispatch:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Express 2-3 Days</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="default"
                  size="default"
                  onClick={handleClose}
                  className="font-black px-6 h-10 text-xs"
                >
                  BACK TO SHOP
                </Button>
              </div>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}
