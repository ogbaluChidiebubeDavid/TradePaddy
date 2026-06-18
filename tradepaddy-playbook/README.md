# TradePaddy Adaptive Regime Strategy

This strategy is designed specifically for the Bitget AI Base Camp Hackathon Trading Agent track. It implements a quantitative market regime detection mechanism that adapts to changing market environments by switching between trend-following and mean-reversion tactics.

## 策略说明 (Strategy Thesis)
The market fluctuates between trending regimes and ranging (sideways) regimes. This strategy uses the Average Directional Index (ADX) to estimate the strength of the current trend:
- When ADX is high, the market is determined to be trending. The strategy employs a trend-following approach using fast and slow Moving Averages.
- When ADX is low, the market is ranging. The strategy employs a mean-reversion approach using Bollinger Bands and the Relative Strength Index (RSI).
- When ADX is in between, the market is transitioning (unclear), and the strategy stays flat to avoid whipsaw losses.

## 开仓逻辑 (Entry Logic)
1. **Trending Mode (ADX > 25)**:
   - Enters **Long** if the fast moving average crosses above the slow moving average.
   - Enters **Short** if the fast moving average crosses below the slow moving average.
2. **Ranging Mode (ADX < 20)**:
   - Enters **Long** (Oversold) if the close price falls below the lower Bollinger Band and RSI is below 30.
   - Enters **Short** (Overbought) if the close price rises above the upper Bollinger Band and RSI is above 70.

## 平仓与止损 (Exit Logic)
- **Trending Mode**: Positions are closed (平仓) if the fast and slow moving averages crossover in the opposite direction.
- **Ranging Mode**: Positions are closed (平仓) when the price reverts back to the 20-period moving average (mean).
- **Transition/Unclear Mode**: If the regime shifts into the unclear zone (ADX between 20 and 25), any open positions are closed immediately to remain flat.

## 策略参数 (Parameters & Tunables)
- `leverage`: User-controlled leverage. Higher leverage amplifies returns and drawdowns.
- `margin_budget`: Allocation budget in USDT used to size trades and calculate strategy return percentages.

## 风险提示 (Risks & Underperformance)
- **Sideways whipsaws (震荡洗盘)**: High-noise transitional periods can cause rapid switching and consecutive small losses.
- **Extreme trend continuation**: If a trend develops aggressively when the system is in range mode, mean-reversion entries can face substantial drawdown before hitting the regime threshold.
- **News Gaps (突发事件风险)**: Volatile price spikes around macro releases can cause execution slippage.
