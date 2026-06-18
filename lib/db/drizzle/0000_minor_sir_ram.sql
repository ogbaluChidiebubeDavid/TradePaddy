CREATE TABLE "market_analyses" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset" text NOT NULL,
	"bullish_score" numeric(5, 2) NOT NULL,
	"bearish_score" numeric(5, 2) NOT NULL,
	"confidence_score" numeric(5, 2) NOT NULL,
	"risk_score" numeric(5, 2) NOT NULL,
	"recommendation" text NOT NULL,
	"summary" text NOT NULL,
	"evidence" json DEFAULT '[]'::json,
	"risk_analysis" text NOT NULL,
	"macro_signals" json DEFAULT '{}'::json,
	"sentiment_signals" json DEFAULT '{}'::json,
	"technical_signals" json DEFAULT '{}'::json,
	"onchain_signals" json DEFAULT '{}'::json,
	"news_signals" json DEFAULT '{}'::json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "behavior_patterns" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"severity" text NOT NULL,
	"description" text NOT NULL,
	"occurrences" integer DEFAULT 0 NOT NULL,
	"impact_on_pnl" numeric(20, 8) DEFAULT '0' NOT NULL,
	"recommendation" text NOT NULL,
	"example_trade_ids" json DEFAULT '[]'::json,
	"detected_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'New Chat' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coaching_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"key_insights" json DEFAULT '[]'::json,
	"top_mistakes" json DEFAULT '[]'::json,
	"improvements" json DEFAULT '[]'::json,
	"recommendations" json DEFAULT '[]'::json,
	"trading_score" numeric(5, 2) NOT NULL,
	"win_rate" numeric(5, 2),
	"total_trades" integer,
	"total_pnl" numeric(20, 8),
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trades" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset" text NOT NULL,
	"direction" text NOT NULL,
	"entry_price" numeric(20, 8) NOT NULL,
	"exit_price" numeric(20, 8),
	"quantity" numeric(20, 8) NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"entry_reason" text NOT NULL,
	"exit_reason" text,
	"market_conditions" text NOT NULL,
	"ai_recommendation" text NOT NULL,
	"user_action" text NOT NULL,
	"pnl" numeric(20, 8),
	"pnl_percent" numeric(10, 4),
	"stop_loss" numeric(20, 8),
	"take_profit" numeric(20, 8),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"closed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"trade_id" integer NOT NULL,
	"asset" text NOT NULL,
	"direction" text NOT NULL,
	"entry_price" numeric(20, 8) NOT NULL,
	"exit_price" numeric(20, 8) NOT NULL,
	"entry_reason" text NOT NULL,
	"exit_reason" text,
	"market_conditions" text NOT NULL,
	"ai_recommendation" text NOT NULL,
	"user_action" text NOT NULL,
	"result" text NOT NULL,
	"pnl" numeric(20, 8) NOT NULL,
	"pnl_percent" numeric(10, 4) NOT NULL,
	"lessons_learned" text,
	"notes" text,
	"behavior_flags" json DEFAULT '[]'::json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_value" numeric(20, 8) NOT NULL,
	"total_pnl" numeric(20, 8) NOT NULL,
	"cash_balance" numeric(20, 8) NOT NULL,
	"invested_value" numeric(20, 8) NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trade_replays" (
	"id" serial PRIMARY KEY NOT NULL,
	"trade_id" integer NOT NULL,
	"journal_entry_id" integer,
	"asset" text NOT NULL,
	"entry_date" text NOT NULL,
	"entry_price" numeric(20, 8) NOT NULL,
	"exit_price" numeric(20, 8) NOT NULL,
	"direction" text NOT NULL,
	"market_context" text NOT NULL,
	"news_events" json DEFAULT '[]'::json,
	"sentiment_conditions" text NOT NULL,
	"whale_activity" text NOT NULL,
	"technical_indicators" json DEFAULT '{}'::json,
	"user_reasoning" text NOT NULL,
	"ai_recommendation" text NOT NULL,
	"actual_outcome" text NOT NULL,
	"lessons_learned" text NOT NULL,
	"pnl" numeric(20, 8) NOT NULL,
	"pnl_percent" numeric(10, 4) NOT NULL,
	"behavior_flags" json DEFAULT '[]'::json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "risk_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"risk_score" numeric(5, 2) NOT NULL,
	"portfolio_health_score" numeric(5, 2) NOT NULL,
	"max_exposure_warnings" json DEFAULT '[]'::json,
	"stop_loss_suggestions" json DEFAULT '[]'::json,
	"position_size_suggestions" json DEFAULT '[]'::json,
	"concentration_risks" json DEFAULT '[]'::json,
	"summary" text NOT NULL,
	"recommendations" json DEFAULT '[]'::json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
