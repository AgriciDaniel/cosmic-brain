"""Shared, side-effect-free URL credential detection."""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass
from urllib.parse import SplitResult, parse_qsl


_SENSITIVE_QUERY_KEYS = frozenset(
    {
        "access_token",
        "api_key",
        "apikey",
        "auth",
        "authorization",
        "credential",
        "key",
        "password",
        "secret",
        "sig",
        "signature",
        "token",
    }
)
_SENSITIVE_QUERY_PARTS = frozenset(
    {
        "apikey",
        "auth",
        "authorization",
        "credential",
        "key",
        "password",
        "secret",
        "sig",
        "signature",
        "token",
    }
)
_SENSITIVE_QUERY_SUFFIXES = (
    "accesskey",
    "accesskeyid",
    "accesstoken",
    "apikey",
    "authtoken",
    "credential",
    "idtoken",
    "securitytoken",
    "signature",
)


@dataclass(frozen=True)
class URLSafetyIssue:
    kind: str
    parameter: str | None = None

    @property
    def message(self) -> str:
        if self.kind == "userinfo":
            return "URL userinfo credentials are forbidden"
        return f"sensitive URL query parameter is forbidden: {self.parameter}"


def _query_key_is_sensitive(value: str) -> bool:
    normalized = unicodedata.normalize("NFKC", value).casefold()
    if normalized in _SENSITIVE_QUERY_KEYS:
        return True
    parts = tuple(part for part in re.split(r"[^a-z0-9]+", normalized) if part)
    if any(part in _SENSITIVE_QUERY_PARTS for part in parts):
        return True
    collapsed = "".join(parts)
    return any(collapsed.endswith(suffix) for suffix in _SENSITIVE_QUERY_SUFFIXES)


def url_credential_issue(parsed: SplitResult) -> URLSafetyIssue | None:
    """Return the first credential-bearing URL component, if any.

    Query keys are decoded by :func:`parse_qsl` before comparison. Besides
    generic names, the check catches vendor-prefixed forms such as
    ``X-Amz-Signature``, ``X-Amz-Credential``, and
    ``X-Amz-Security-Token``.
    """

    if parsed.username is not None or parsed.password is not None:
        return URLSafetyIssue("userinfo")
    for key, _ in parse_qsl(parsed.query, keep_blank_values=True):
        if _query_key_is_sensitive(key):
            return URLSafetyIssue("sensitive-query", key)
    return None


__all__ = ["URLSafetyIssue", "url_credential_issue"]
