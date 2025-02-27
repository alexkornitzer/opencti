import * as R from 'ramda';
import type { AttributeDefinition } from '../../schema/attribute-definition';
import { schemaAttributesDefinition } from '../../schema/schema-attributes';
import {
  ENTITY_TYPE_CAPABILITY,
  ENTITY_TYPE_CONNECTOR,
  ENTITY_TYPE_GROUP,
  ENTITY_TYPE_MIGRATION_REFERENCE,
  ENTITY_TYPE_MIGRATION_STATUS,
  ENTITY_TYPE_RETENTION_RULE,
  ENTITY_TYPE_ROLE,
  ENTITY_TYPE_RULE,
  ENTITY_TYPE_RULE_MANAGER,
  ENTITY_TYPE_SETTINGS,
  ENTITY_TYPE_STATUS,
  ENTITY_TYPE_STATUS_TEMPLATE,
  ENTITY_TYPE_STREAM_COLLECTION,
  ENTITY_TYPE_SYNC,
  ENTITY_TYPE_BACKGROUND_TASK,
  ENTITY_TYPE_TAXII_COLLECTION,
  ENTITY_TYPE_USER, ENTITY_TYPE_FEED,
} from '../../schema/internalObject';
import { settingsMessages } from '../../domain/settings';

const internalObjectsAttributes: { [k: string]: Array<AttributeDefinition> } = {
  [ENTITY_TYPE_SETTINGS]: [
    { name: 'platform_title', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_organization', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_favicon', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_email', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_background', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_paper', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_nav', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_primary', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_secondary', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_accent', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_logo', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_logo_collapsed', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_dark_logo_login', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_background', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_paper', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_nav', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_primary', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_secondary', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_accent', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_logo', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_logo_collapsed', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_theme_light_logo_login', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_language', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_login_message', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_consent_message', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_consent_confirm_text', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_banner_text', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platform_banner_level', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'otp_mandatory', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_min_length', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_max_length', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_min_numbers', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_min_symbols', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_min_words', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_min_lowercase', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'password_policy_min_uppercase', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'enterprise_edition', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'activity_listeners_ids', type: 'string', mandatoryType: 'no', multiple: true, upsert: false },
    { name: 'messages', type: 'json', mandatoryType: 'no', multiple: false, upsert: false, schemaDef: settingsMessages },
  ],
  [ENTITY_TYPE_MIGRATION_STATUS]: [
    { name: 'lastRun', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'platformVersion', type: 'string', mandatoryType: 'no', multiple: false, upsert: false }
  ],
  [ENTITY_TYPE_MIGRATION_REFERENCE]: [
    { name: 'title', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'timestamp', type: 'date', mandatoryType: 'no', multiple: false, upsert: false }
  ],
  [ENTITY_TYPE_GROUP]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'default_assignation', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'auto_new_marking', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'default_marking', type: 'json', mandatoryType: 'no', multiple: true, upsert: false },
    { name: 'default_dashboard', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'default_hidden_types', type: 'string', mandatoryType: 'no', multiple: true, upsert: false },
  ],
  [ENTITY_TYPE_USER]: [
    { name: 'user_email', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'password', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'firstname', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'lastname', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'theme', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'language', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'external', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'bookmarks', type: 'json', mandatoryType: 'no', multiple: true, upsert: false },
    { name: 'api_token', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'otp_secret', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'otp_qr', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'otp_activated', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'default_dashboard', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'default_time_field', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'account_status', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'account_lock_after_date', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_ROLE]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_RULE]: [
    { name: 'active', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true }
  ],
  [ENTITY_TYPE_RULE_MANAGER]: [
    { name: 'lastEventId', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'errors', type: 'string', mandatoryType: 'no', multiple: false, upsert: false }
  ],
  [ENTITY_TYPE_CAPABILITY]: [
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'attribute_order', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_CONNECTOR]: [
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'active', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'auto', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'only_contextual', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'connector_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'connector_scope', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'connector_state', type: 'json', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'connector_state_reset', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'connector_user_id', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_TAXII_COLLECTION]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'filters', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'taxii_public', type: 'boolean', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'authorized_members', type: 'json', mandatoryType: 'no', multiple: true, upsert: false },
  ],
  [ENTITY_TYPE_FEED]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'filters', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'separator', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'rolling_time', type: 'numeric', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'include_header', type: 'boolean', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'feed_public', type: 'boolean', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'feed_types', type: 'string', mandatoryType: 'external', multiple: true, upsert: false },
    { name: 'feed_attributes', type: 'json', mandatoryType: 'no', multiple: true, upsert: false },
    { name: 'authorized_members', type: 'json', mandatoryType: 'no', multiple: true, upsert: false },
  ],
  [ENTITY_TYPE_STREAM_COLLECTION]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'filters', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'stream_public', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'stream_live', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'authorized_members', type: 'json', mandatoryType: 'no', multiple: true, upsert: false },
  ],
  [ENTITY_TYPE_STATUS_TEMPLATE]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'color', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_STATUS]: [
    { name: 'template_id', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'type', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'order', type: 'numeric', mandatoryType: 'external', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_BACKGROUND_TASK]: [
    { name: 'task_position', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'task_processed_number', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'task_expected_number', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'last_execution_date', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'completed', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_RETENTION_RULE]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'filters', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'max_retention', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'last_execution_date', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'last_deleted_count', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'remaining_count', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_TYPE_SYNC]: [
    { name: 'name', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'uri', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'ssl_verify', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'synchronized', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'user_id', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'token', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'stream_id', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'running', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'current_state_date', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'listen_deletion', type: 'boolean', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'no_dependencies', type: 'boolean', mandatoryType: 'external', multiple: false, upsert: false },
  ],
};

R.forEachObjIndexed((value, key) => schemaAttributesDefinition.registerAttributes(key as string, value), internalObjectsAttributes);
