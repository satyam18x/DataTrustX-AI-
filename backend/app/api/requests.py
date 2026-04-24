from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel

from app.core.dependencies import get_current_user, get_db
from app.models.request import DatasetRequest
from app.models.offer import DatasetOffer
from app.models.deal import Deal

router = APIRouter()


class RequestCreate(BaseModel):
    title: str
    description: str
    domain: str


@router.post("/request")
def create_request(
    data: RequestCreate,
    user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "buyer":
        raise HTTPException(
            status_code=403,
            detail="Only buyers can create dataset requests"
        )

    req = DatasetRequest(
        buyer_username=user.username,
        title=data.title,
        description=data.description,
        domain=data.domain
    )

    db.add(req)
    db.commit()

    return {
    "message": "Dataset request posted successfully",
    "request_id": req.id
}


@router.get("/my_requests")
def get_my_requests(
    user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "buyer":
        raise HTTPException(
            status_code=403,
            detail="Only buyers can view their requests"
        )

    requests = (
        db.query(DatasetRequest)
        .filter(DatasetRequest.buyer_username == user.username)
        .order_by(DatasetRequest.created_at.desc())
        .all()
    )

    return [
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "domain": r.domain,
            "created_at": r.created_at
        }
        for r in requests
    ]


@router.get("/buyer_stats")
def get_buyer_stats(
    user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "buyer":
        raise HTTPException(status_code=403, detail="Only buyers can view their stats")

    # All request IDs belonging to this buyer
    my_request_ids = [
        r.id for r in db.query(DatasetRequest.id)
        .filter(DatasetRequest.buyer_username == user.username)
        .all()
    ]

    pending_requirements = len(my_request_ids)

    # Capital deployed: sum of prices of deals that are escrowed or released
    capital_result = (
        db.query(func.sum(Deal.price))
        .filter(
            Deal.buyer_username == user.username,
            Deal.payment_status.in_(["escrowed", "released"])
        )
        .scalar()
    )
    capital_deployed = capital_result or 0

    # Verified offers: total offers received on this buyer's requests
    verified_offers = 0
    if my_request_ids:
        verified_offers = (
            db.query(func.count(DatasetOffer.id))
            .filter(DatasetOffer.request_id.in_(my_request_ids))
            .scalar()
        ) or 0

    # Completed assets: deals where delivery is confirmed
    completed_assets = (
        db.query(func.count(Deal.id))
        .filter(
            Deal.buyer_username == user.username,
            Deal.delivery_status == "confirmed"
        )
        .scalar()
    ) or 0

    return {
        "pending_requirements": pending_requirements,
        "capital_deployed": capital_deployed,
        "verified_offers": verified_offers,
        "completed_assets": completed_assets
    }
